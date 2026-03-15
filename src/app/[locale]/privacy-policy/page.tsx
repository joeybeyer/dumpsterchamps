import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Privacy Policy | Dumpster Champs",
  description:
    "Read our privacy policy to understand how Dumpster Champs collects, uses, and protects your personal information.",
};

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === "es";

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-secondary-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">
              {isEs ? "Inicio" : "Home"}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">
              {isEs ? "Política de Privacidad" : "Privacy Policy"}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {isEs ? "Política de Privacidad" : "Privacy Policy"}
          </h1>
          <p className="text-xl text-secondary-200 max-w-3xl">
            {isEs
              ? "Su privacidad es importante para nosotros. Esta política describe cómo recopilamos, usamos y protegemos su información."
              : "Your privacy is important to us. This policy describes how we collect, use, and protect your information."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-secondary">
            <p className="text-secondary-500 mb-8">
              {isEs ? "Última actualización: 14 de marzo de 2026" : "Last updated: March 14, 2026"}
            </p>

            <h2>{isEs ? "Información que Recopilamos" : "Information We Collect"}</h2>
            <p>
              {isEs
                ? "Cuando utiliza nuestros servicios, podemos recopilar la siguiente información:"
                : "When you use our services, we may collect the following information:"}
            </p>
            <ul>
              <li>
                {isEs
                  ? "Información de contacto (nombre, dirección de correo electrónico, número de teléfono)"
                  : "Contact information (name, email address, phone number)"}
              </li>
              <li>
                {isEs
                  ? "Dirección de entrega y servicio"
                  : "Delivery and service address"}
              </li>
              <li>
                {isEs
                  ? "Información de pago (procesada de forma segura a través de nuestros socios de pago)"
                  : "Payment information (securely processed through our payment partners)"}
              </li>
              <li>
                {isEs
                  ? "Detalles del proyecto y requisitos del servicio"
                  : "Project details and service requirements"}
              </li>
              <li>
                {isEs
                  ? "Datos de uso del sitio web y cookies"
                  : "Website usage data and cookies"}
              </li>
            </ul>

            <h2>{isEs ? "Cómo Usamos Su Información" : "How We Use Your Information"}</h2>
            <p>
              {isEs
                ? "Utilizamos la información recopilada para:"
                : "We use the information collected to:"}
            </p>
            <ul>
              <li>
                {isEs
                  ? "Proporcionar y entregar nuestros servicios de alquiler de contenedores"
                  : "Provide and deliver our dumpster rental services"}
              </li>
              <li>
                {isEs
                  ? "Procesar pagos y transacciones"
                  : "Process payments and transactions"}
              </li>
              <li>
                {isEs
                  ? "Comunicarnos con usted sobre su pedido"
                  : "Communicate with you about your order"}
              </li>
              <li>
                {isEs
                  ? "Mejorar nuestros servicios y la experiencia del cliente"
                  : "Improve our services and customer experience"}
              </li>
              <li>
                {isEs
                  ? "Enviar actualizaciones promocionales (con su consentimiento)"
                  : "Send promotional updates (with your consent)"}
              </li>
            </ul>

            <h2>{isEs ? "Compartir Información" : "Information Sharing"}</h2>
            <p>
              {isEs
                ? "No vendemos ni alquilamos su información personal a terceros. Podemos compartir información con:"
                : "We do not sell or rent your personal information to third parties. We may share information with:"}
            </p>
            <ul>
              <li>
                {isEs
                  ? "Proveedores de servicios que nos ayudan a operar nuestro negocio"
                  : "Service providers who help us operate our business"}
              </li>
              <li>
                {isEs
                  ? "Socios de transporte para coordinar entregas"
                  : "Hauling partners to coordinate deliveries"}
              </li>
              <li>
                {isEs
                  ? "Procesadores de pago para transacciones seguras"
                  : "Payment processors for secure transactions"}
              </li>
              <li>
                {isEs
                  ? "Autoridades legales cuando sea requerido por ley"
                  : "Legal authorities when required by law"}
              </li>
            </ul>

            <h2>{isEs ? "Seguridad de Datos" : "Data Security"}</h2>
            <p>
              {isEs
                ? "Implementamos medidas de seguridad estándar de la industria para proteger su información personal. Esto incluye conexiones encriptadas (SSL/TLS) para todas las transmisiones de datos y almacenamiento seguro de la información del cliente."
                : "We implement industry-standard security measures to protect your personal information. This includes encrypted connections (SSL/TLS) for all data transmissions and secure storage of customer information."}
            </p>

            <h2>{isEs ? "Cookies y Seguimiento" : "Cookies and Tracking"}</h2>
            <p>
              {isEs
                ? "Nuestro sitio web utiliza cookies para mejorar su experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido. Puede controlar las preferencias de cookies a través de la configuración de su navegador."
                : "Our website uses cookies to improve your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings."}
            </p>

            <h2>{isEs ? "Sus Derechos" : "Your Rights"}</h2>
            <p>{isEs ? "Usted tiene derecho a:" : "You have the right to:"}</p>
            <ul>
              <li>
                {isEs
                  ? "Acceder a la información personal que tenemos sobre usted"
                  : "Access the personal information we hold about you"}
              </li>
              <li>
                {isEs
                  ? "Solicitar la corrección de información inexacta"
                  : "Request correction of inaccurate information"}
              </li>
              <li>
                {isEs
                  ? "Solicitar la eliminación de sus datos"
                  : "Request deletion of your data"}
              </li>
              <li>
                {isEs
                  ? "Optar por no recibir comunicaciones de marketing"
                  : "Opt out of marketing communications"}
              </li>
            </ul>

            <h2>{isEs ? "Privacidad de los Niños" : "Children's Privacy"}</h2>
            <p>
              {isEs
                ? "Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos conscientemente información de niños."
                : "Our services are not directed to individuals under 18. We do not knowingly collect information from children."}
            </p>

            <h2>{isEs ? "Cambios a Esta Política" : "Changes to This Policy"}</h2>
            <p>
              {isEs
                ? "Podemos actualizar esta política de privacidad periódicamente. Los cambios se publicarán en esta página con una fecha de última actualización revisada."
                : "We may update this privacy policy from time to time. Changes will be posted on this page with a revised last updated date."}
            </p>

            <h2>{isEs ? "Contáctenos" : "Contact Us"}</h2>
            <p>
              {isEs
                ? "Si tiene preguntas sobre esta política de privacidad o nuestras prácticas de datos, contáctenos en:"
                : "If you have questions about this privacy policy or our data practices, please contact us at:"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:privacy@dumpsterchamps.com">
                privacy@dumpsterchamps.com
              </a>
              <br />
              <strong>{isEs ? "Teléfono" : "Phone"}:</strong>{" "}
              <a href="tel:1-888-DUMPSTER">1-888-DUMPSTER</a>
            </p>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          {
            name: "Privacy Policy",
            url: "https://www.dumpsterchamps.com/privacy-policy",
          },
        ]}
      />
    </>
  );
}
