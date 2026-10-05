#!/usr/bin/env bash
set -euo pipefail

terraform_version=1.5.7
node_version=22.23.3

cdk_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$cdk_dir"

if node -e '
  const fs = require("node:fs")
  const config = JSON.parse(fs.readFileSync("cdktf.json", "utf8"))
  const generated = JSON.parse(fs.readFileSync(".gen/constraints.json", "utf8"))
  const expected = Object.fromEntries(
    config.terraformProviders.map((provider) => {
      const [, name, constraint] = provider.match(/^[^/]+\/([^@]+)@(.+)$/)
      return [name, constraint]
    }),
  )
  const upToDate =
    generated.cdktf === require("cdktf/package.json").version &&
    JSON.stringify(generated.providers) === JSON.stringify(expected)
  process.exit(upToDate ? 0 : 1)
' 2>/dev/null; then
  exit 0
fi

if [[ "$(terraform version 2>/dev/null | head -n 1)" == "Terraform v${terraform_version}" ]]; then
  terraform_dir="$(dirname "$(command -v terraform)")"
else
  case "$(uname -s)" in
    Linux) os=linux ;;
    Darwin) os=darwin ;;
    *) echo "Système non pris en charge : $(uname -s)" >&2 && exit 1 ;;
  esac
  case "$(uname -m)" in
    x86_64 | amd64) arch=amd64 ;;
    aarch64 | arm64) arch=arm64 ;;
    *) echo "Architecture non prise en charge : $(uname -m)" >&2 && exit 1 ;;
  esac

  terraform_dir="$cdk_dir/node_modules/.cache/terraform/$terraform_version"
  if [[ ! -x "$terraform_dir/terraform" ]]; then
    archive="terraform_${terraform_version}_${os}_${arch}.zip"
    release_url="https://releases.hashicorp.com/terraform/${terraform_version}"
    download_dir="$(mktemp -d)"
    trap 'rm -rf "$download_dir"' EXIT

    curl -fsSL -o "$download_dir/$archive" "$release_url/$archive"
    curl -fsSL -o "$download_dir/SHA256SUMS" "$release_url/terraform_${terraform_version}_SHA256SUMS"

    expected_sum="$(grep " ${archive}\$" "$download_dir/SHA256SUMS" | cut -d ' ' -f 1)"
    actual_sum="$( (sha256sum "$download_dir/$archive" 2>/dev/null || shasum -a 256 "$download_dir/$archive") | cut -d ' ' -f 1)"
    if [[ -z "$expected_sum" || "$expected_sum" != "$actual_sum" ]]; then
      echo "Somme de contrôle invalide pour $archive" >&2
      exit 1
    fi

    mkdir -p "$terraform_dir"
    unzip -q -o "$download_dir/$archive" terraform -d "$terraform_dir"
  fi
fi

rm -rf .gen
PATH="$terraform_dir:$PATH" npm_config_use_node_version="$node_version" pnpm exec cdktf get
