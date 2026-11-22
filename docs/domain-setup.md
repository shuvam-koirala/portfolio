# Moving shuvamkoirala.com.np to the new site

Your portfolio is live at **https://shuvam-koirala.github.io/portfolio/**. These steps make
**https://shuvamkoirala.com.np** show it too. Everything here is free.

**Why the change is needed:** your domain currently uses InfinityFree's nameservers
(`ns1.epizy.com`, `ns2.epizy.com`), which can't point to GitHub. We'll move the DNS to
Cloudflare (free) and point it at GitHub Pages.

> Once you finish step 3, whatever InfinityFree was hosting on the domain stops showing.
> (It currently returns an empty page anyway.)

## 1. Add the domain to Cloudflare (about 5 minutes)

1. Sign up at https://dash.cloudflare.com/sign-up (free).
2. Click **Add a domain**, type `shuvamkoirala.com.np`, and choose the **Free** plan.
3. Cloudflare may import some old records. **Delete any A, AAAA or CNAME records it imported**
   for `shuvamkoirala.com.np` and `www`.

## 2. Add these DNS records in Cloudflare

Go to **DNS → Records → Add record**. For every record, set **Proxy status to "DNS only"**
(grey cloud, not orange).

| Type  | Name  | Content                    |
|-------|-------|----------------------------|
| A     | `@`   | `185.199.108.153`          |
| A     | `@`   | `185.199.109.153`          |
| A     | `@`   | `185.199.110.153`          |
| A     | `@`   | `185.199.111.153`          |
| AAAA  | `@`   | `2606:50c0:8000::153`      |
| AAAA  | `@`   | `2606:50c0:8001::153`      |
| AAAA  | `@`   | `2606:50c0:8002::153`      |
| AAAA  | `@`   | `2606:50c0:8003::153`      |
| CNAME | `www` | `shuvam-koirala.github.io` |

Cloudflare then shows you **two nameservers** (something like `xxx.ns.cloudflare.com`).
Copy them.

## 3. Change the nameservers at register.com.np

1. Log in at https://register.com.np with the account that registered the domain.
2. Open `shuvamkoirala.com.np` → **Edit / Update nameservers**.
3. Replace `ns1.epizy.com` and `ns2.epizy.com` with the two Cloudflare nameservers.
4. Save. Approval for `.np` domains can take from a few hours to a couple of days.

## 4. Tell Claude when it's done

You can check yourself in Terminal:

```
dig +short shuvamkoirala.com.np
```

When it prints the `185.199.x.153` addresses, tell Claude. Claude will then:

- add a `CNAME` file containing `shuvamkoirala.com.np`,
- switch the site to build for the domain root instead of `/portfolio/`,
- push, and check that the domain loads.

## 5. Turn on HTTPS (one click, by you)

About 15–60 minutes after Claude's push, open
https://github.com/shuvam-koirala/portfolio/settings/pages and tick **Enforce HTTPS**.
(The box stays greyed out until GitHub has issued the certificate. Wait and refresh if so.)

Old links like `shuvam-koirala.github.io/portfolio/palette-craft/privacy-policy.html` will
automatically redirect to `shuvamkoirala.com.np/palette-craft/privacy-policy.html`.

## Later: a domain email address (optional)

When you want `hello@shuvamkoirala.com.np`, use Cloudflare **Email → Email Routing** to forward
it to your Gmail (free), then ask Claude to change the email in `src/data/site.ts`.
