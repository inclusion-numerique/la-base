#!/usr/bin/env bash
set -euo pipefail

tofu_version=1.13.1

cdk_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$cdk_dir"

if node -e '
  const fs = require("node:fs")
  const config = JSON.parse(fs.readFileSync("cdktf.json", "utf8"))
  const generated = JSON.parse(fs.readFileSync(".gen/constraints.json", "utf8"))
  const expected = Object.fromEntries(
    config.terraformProviders.map((provider) => {
      const [, name, constraint] = provider.match(/^(?:.*\/)?([^/@]+)@(.+)$/)
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

if [[ "$(tofu version 2>/dev/null | head -n 1)" == "OpenTofu v${tofu_version}" ]]; then
  tofu_dir="$(dirname "$(command -v tofu)")"
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

  tofu_dir="$cdk_dir/node_modules/.cache/tofu/$tofu_version"
  if [[ ! -x "$tofu_dir/tofu" ]]; then
    archive="tofu_${tofu_version}_${os}_${arch}.zip"
    release_url="https://github.com/opentofu/opentofu/releases/download/v${tofu_version}"
    download_dir="$(mktemp -d)"
    trap 'rm -rf "$download_dir"' EXIT

    curl -fsSL -o "$download_dir/$archive" "$release_url/$archive"
    curl -fsSL -o "$download_dir/SHA256SUMS" "$release_url/tofu_${tofu_version}_SHA256SUMS"

    expected_sum="$(grep " ${archive}\$" "$download_dir/SHA256SUMS" | cut -d ' ' -f 1)"
    actual_sum="$( (sha256sum "$download_dir/$archive" 2>/dev/null || shasum -a 256 "$download_dir/$archive") | cut -d ' ' -f 1)"
    if [[ -z "$expected_sum" || "$expected_sum" != "$actual_sum" ]]; then
      echo "Somme de contrôle invalide pour $archive" >&2
      exit 1
    fi

    mkdir -p "$tofu_dir"
    unzip -q -o "$download_dir/$archive" tofu -d "$tofu_dir"
  fi
fi

rm -rf .gen
PATH="$tofu_dir:$PATH" TERRAFORM_BINARY_NAME=tofu pnpm exec cdktf get
