import { Resend } from "resend";

// Lazy initialization to avoid build-time errors
let resend: Resend | null = null;

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured - email notifications disabled");
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

interface LeadEmailData {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
  projectType?: string;
  dumpsterSize?: string;
  message?: string;
  source?: string;
  referrer?: string;  // Raw HTTP referrer
  llmSource?: string | null; // Detected LLM source (ChatGPT, Perplexity, etc.)
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export async function sendLeadNotification(lead: LeadEmailData) {
  const client = getResendClient();
  if (!client) {
    console.log("Email notifications disabled - skipping lead notification");
    return { success: false, error: "Email not configured" };
  }

  const adminEmail = process.env.ADMIN_EMAIL || "contact@dumpsterchamps.com";
  const fromEmail = process.env.FROM_EMAIL || "noreply@dumpsterchamps.com";

  try {
    const { data, error } = await client.emails.send({
      from: `Dumpster Champs <${fromEmail}>`,
      to: [adminEmail],
      bcc: ['Garrett@primedumpster.com', 'leads@primedumpster.com'],
      subject: `📞 AUTO-CALLBACK TRIGGERED: ${lead.name} - ${lead.city || "Unknown City"}`,
      html: `
        <h2>🤖 Lead Received - Auto-Callback Triggered</h2>
        <p style="background: #e8f5e9; padding: 12px; border-radius: 4px; font-weight: bold;">
          ✅ Retell AI is calling this lead right now. Do NOT call manually - buyer will receive via Retreaver.
        </p>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Location</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.city || ""}${lead.city && lead.state ? ", " : ""}${lead.state || ""}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Project Type</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.projectType || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Dumpster Size</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.dumpsterSize || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.message || "No message"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Source Page</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.source || "Unknown"}</td>
          </tr>
          ${lead.llmSource ? `
          <tr style="background-color: #e8f5e9;">
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">🤖 AI Referral</td>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>${lead.llmSource}</strong></td>
          </tr>
          ` : lead.referrer ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Referrer</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.referrer}</td>
          </tr>
          ` : ''}
          ${(lead.utmSource || lead.utmMedium || lead.utmCampaign) ? `
          <tr style="background-color: #fff8e1;">
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">📊 Traffic Source</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${[lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(' / ')}</td>
          </tr>
          ` : ''}
        </table>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
