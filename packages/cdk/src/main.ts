#!/usr/bin/env node
import { ProjectStack } from '@app/cdk/ProjectStack'
import { App } from 'cdktf'

const app = new App()

new ProjectStack(app)

app.synth()
