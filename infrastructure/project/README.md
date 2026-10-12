# Project infrastructure

Resources shared by every environment, described in HCL and deployed with OpenTofu on Scaleway.

## Resources

- Managed PostgreSQL instance and the `DATABASE_INSTANCE_ID` secret (`database.tf`)
- Container namespace, with the variables shared by every container, and container registry (`containers.tf`)
- Uploads, legacy uploads and backups buckets (`storage.tf`)
- Transactional emails domain (`email.tf`)
- DNS records of the main and preview zones: name servers, emails, Brevo, uploads CDN, maildev (`dns.tf`)
- Cockpit and the token of the web containers (`cockpit.tf`)
- maildev instance, used by the previews (`maildev.tf`)

The uploads CDN edge pipeline is configured by hand in the Scaleway console; `dns.tf` only points `storage` to it.

The state is stored in the `la-base-terraform-state` bucket under the `la-base-project.tfstate` key.

## Deployment

The `Infrastructure project` workflow is run by hand on `main`. It plans the project stack and publishes the plan in the run summary. With the `apply` option, it then applies the plan, after an approval on the `infrastructure-approval` GitHub environment when the plan changes anything beyond the sensitivity marks of the state. The apply fails if the plan changed since its approval.

The CI also plans the project stack when a branch changes `infrastructure/project/`.

## Local plan

```bash
pnpm cli infrastructure:vars-from-env project
pnpm with-env tofu -chdir=infrastructure/project init
pnpm with-env tofu -chdir=infrastructure/project plan -var-file=.tfvars.json
```
