# Social Links Visual QA

The desktop full-page preview at 1280px wide was reviewed. The existing contact-information card in the location section remains intact, with the new Instagram and Facebook icon buttons appearing together beneath the existing directions, phone, and WhatsApp actions. The icons stay inside the dark contact card, use the site's cream/coral visual treatment, and do not appear in the footer, header, menu, booking section, or mobile quick-contact bar.

The mobile full-page preview at 375px wide was reviewed. The social icon row remains inside the contact-information card below the existing contact actions, fits within the card without overflow, and does not interfere with the fixed Call, WhatsApp, and Order bar. The rest of the page content and existing contact information remain visibly unchanged.

Automated checks also passed: the targeted menu/contact Vitest suite passed all 5 tests, TypeScript validation passed, and the production build completed successfully.

The complete Vitest suite also passed: 7 test files passed, with 22 tests passing and 1 intentionally skipped. Existing Shopify, auth, landing-page, deployment, and commerce tests remain green.
