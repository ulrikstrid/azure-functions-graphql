# Azure Functions with webpack

This repo is a boilerplate of sorts to get started with Azure Functions and webpack.
It also includes my take on how to best do deployments via CI.

I deploy by listening to the `production` branch for deployment and then I commit the built file on my CI of choice (CircleCI) and push it to that branch.