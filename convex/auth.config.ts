export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN || "https://your-clerk-domain.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
};