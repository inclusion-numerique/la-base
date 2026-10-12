# Infrastructure

The infrastructure of each environment (`main`, `dev` and the previews) is described in HCL and deployed with OpenTofu on Scaleway.

- OpenTofu: https://opentofu.org
- Scaleway provider: https://search.opentofu.org/provider/scaleway/scaleway/latest

Resources shared by every environment (database instance, container namespace, registry, DNS zones, transactional emails, Cockpit) are managed by the project stack in `project/`, see `project/README.md`.

## Resources of an environment

- Database user, database and privileges on the shared instance (`database.tf`)
- Uploads bucket (`storage.tf`)
- Serverless container and its environment variables (`container.tf`)
- DNS record and container domain (`dns.tf`)
- Job cron triggers of `main` (`jobs.tf`, UTC schedules in `locals.tf`)

The state of each environment is stored in the `la-base-terraform-state` bucket under the `la-base-web-<namespace>.tfstate` key, passed to `tofu init` with `-backend-config`.

## Bootstrap of a new project

- Create the project on Scaleway, add the relevant users with full access on its resources and Secret Manager, and an IAM application with the same access for the CI
- Add the main and preview domains and validate them with DNS
- Change the project variables in `packages/config/src/config.ts` and in `.env.dist`
- Add the secrets to the Secret Manager (documented in `.env.dist`) and to `apps/cli/src/commands/infrastructure/infrastructureVariables.ts`
- Create the `la-base-terraform-state` bucket for the OpenTofu states
- Deploy the project stack with the `Infrastructure project` workflow, then validate the transactional emails domain in the Scaleway console

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
