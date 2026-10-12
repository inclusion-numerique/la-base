# Infrastructure

The infrastructure of each environment (`main`, `dev` and the previews) is described in HCL and deployed with OpenTofu on Scaleway.

- OpenTofu: https://opentofu.org
- Scaleway provider: https://search.opentofu.org/provider/scaleway/scaleway/latest

Resources shared by every environment (database instance, container namespace, registry, DNS zones, transactional emails, Cockpit) are still managed by the CDKTF project stack in `packages/cdk`.

## Resources of an environment

- Database user, database and privileges on the shared instance (`database.tf`)
- Uploads bucket (`storage.tf`)
- Serverless container and its environment variables (`container.tf`)
- DNS record and container domain (`dns.tf`)
- Job cron triggers of `main` (`jobs.tf`, UTC schedules in `locals.tf`)

The state of each environment is stored in the `la-base-terraform-state` bucket under the `la-base-web-<namespace>.tfstate` key, passed to `tofu init` with `-backend-config`.

## Deployment

Deployment is done via GitHub Actions, using the `Preview`, `Release` and `Remove ephemeral environment` workflows in `.github/workflows/`.

- `infrastructure-plan.reusable.yml` plans an environment against its deployed image and publishes the plan in the run summary.
- On `main`, `Release` plans `dev` and production while the images build. When a plan changes anything beyond the sensitivity marks of the state, the deployment of that environment waits for an approval on the `infrastructure-approval` GitHub environment.
- `deploy.reusable.yml` applies the infrastructure with the built image.

The workflows need the `SCW_ACCESS_KEY` and `SCW_SECRET_KEY` repository secrets, which read the other secrets from the Scaleway Secret Manager.

## Local plan

```bash
DATABASE_PASSWORD=$(pnpm --silent cli secrets:database-password <namespace>) \
  WEB_CONTAINER_IMAGE=<deployed image> pnpm cli infrastructure:vars-from-env
pnpm with-env tofu -chdir=infrastructure init -backend-config="key=la-base-web-<namespace>.tfstate"
pnpm with-env tofu -chdir=infrastructure plan -var-file=.tfvars.json -var "branch=<branch>" -var "namespace=<namespace>"
```
