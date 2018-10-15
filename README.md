# Shopgate Connect auth facebook extension

## Dependencies
This extension uses the `shopgate.user.loginUser.v1` with `strategy = 'facebook'`.
At the moment this is only supported with the implemention inside the `shopgate/legacy-user` extension.

## Setup
- Facebook token needs to be added to your app as described [here](https://support.shopgate.com/hc/en-us/articles/220102927-Facebook-Login-making-your-shop-easier-and-more-personal)
- When used in combination with the `@shopgate/legacy-user` extension:
  - `@shopgate/ext-auth-facebook` needs to be placed BEFORE `@shopgate/legacy-user` in the deployment configuration.

## About Shopgate
Shopgate is the leading mobile commerce platform.
Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License
Shopgate Connect - cart extension is available under the Apache License, Version 2.0.
See the [LICENSE](./LICENSE) file for more information.
