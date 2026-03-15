import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Terms of Service | Dumpster Champs",
  description:
    "Read our terms of service to understand the conditions for using Dumpster Champs dumpster rental services.",
};

export default async function TermsPage({ params }: PageProps) {
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
              {isEs ? "Términos de Servicio" : "Terms of Service"}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {isEs ? "Términos de Servicio" : "Terms of Service"}
          </h1>
          <p className="text-xl text-secondary-200 max-w-3xl">
            {isEs
              ? "Por favor lea estos términos cuidadosamente antes de usar nuestros servicios."
              : "Please read these terms carefully before using our services."}
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

            <h2>{isEs ? "Aceptación de los Términos" : "Acceptance of Terms"}</h2>
            <p>
              {isEs
                ? "Al acceder o utilizar los servicios de Dumpster Champs, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, no puede acceder al servicio."
                : "By accessing or using Dumpster Champs services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service."}
            </p>

            <h2>{isEs ? "Descripción del Servicio" : "Service Description"}</h2>
            <p>
              {isEs
                ? "Dumpster Champs proporciona servicios de alquiler de contenedores de basura para uso residencial y comercial. Nuestros servicios incluyen la entrega, alquiler y recogida de contenedores roll-off en varios tamaños."
                : "Dumpster Champs provides roll-off dumpster rental services for residential and commercial use. Our services include delivery, rental, and pickup of roll-off containers in various sizes."}
            </p>

            <h2>{isEs ? "Términos de Alquiler" : "Rental Terms"}</h2>
            <h3>{isEs ? "Período de Alquiler" : "Rental Period"}</h3>
            <p>
              {isEs
                ? "El período de alquiler estándar es de 7 días a partir de la fecha de entrega. Se pueden acordar extensiones con anticipación y pueden estar sujetas a cargos adicionales."
                : "The standard rental period is 7 days from the date of delivery. Extensions may be arranged in advance and may be subject to additional charges."}
            </p>

            <h3>{isEs ? "Límites de Peso" : "Weight Limits"}</h3>
            <p>
              {isEs
                ? "Cada tamaño de contenedor tiene un límite de peso incluido. Exceder este límite resultará en cargos adicionales por tonelada. Los límites de peso específicos se proporcionan al momento de la reserva."
                : "Each dumpster size has an included weight limit. Exceeding this limit will result in additional charges per ton. Specific weight limits are provided at the time of booking."}
            </p>

            <h3>{isEs ? "Materiales Prohibidos" : "Prohibited Materials"}</h3>
            <p>
              {isEs
                ? "Los siguientes materiales NO están permitidos en nuestros contenedores:"
                : "The following materials are NOT permitted in our dumpsters:"}
            </p>
            <ul>
              <li>{isEs ? "Materiales peligrosos o tóxicos" : "Hazardous or toxic materials"}</li>
              <li>{isEs ? "Asbesto" : "Asbestos"}</li>
              <li>{isEs ? "Pintura, aceites y químicos" : "Paint, oils, and chemicals"}</li>
              <li>{isEs ? "Baterías y electrónicos" : "Batteries and electronics"}</li>
              <li>{isEs ? "Neumáticos" : "Tires"}</li>
              <li>{isEs ? "Electrodomésticos con refrigerante" : "Appliances with refrigerant"}</li>
              <li>{isEs ? "Desechos médicos" : "Medical waste"}</li>
              <li>{isEs ? "Materiales inflamables o explosivos" : "Flammable or explosive materials"}</li>
            </ul>
            <p>
              {isEs
                ? "Se pueden aplicar cargos adicionales por la eliminación de materiales prohibidos, y el cliente es responsable de cualquier multa resultante."
                : "Additional charges may apply for disposal of prohibited materials, and the customer is responsible for any resulting fines."}
            </p>

            <h2>{isEs ? "Responsabilidades del Cliente" : "Customer Responsibilities"}</h2>
            <ul>
              <li>
                {isEs
                  ? "Proporcionar un acceso adecuado para la entrega y recogida del contenedor"
                  : "Provide adequate access for dumpster delivery and pickup"}
              </li>
              <li>
                {isEs
                  ? "Asegurar que el área de colocación sea plana y estable"
                  : "Ensure the placement area is flat and stable"}
              </li>
              <li>
                {isEs
                  ? "No sobrecargar el contenedor por encima del borde"
                  : "Not overfill the dumpster above the rim"}
              </li>
              <li>
                {isEs
                  ? "Obtener los permisos necesarios para la colocación en la calle si es requerido"
                  : "Obtain necessary permits for street placement if required"}
              </li>
              <li>
                {isEs
                  ? "No mover el contenedor una vez colocado"
                  : "Not move the dumpster once placed"}
              </li>
            </ul>

            <h2>{isEs ? "Precios y Pago" : "Pricing and Payment"}</h2>
            <p>
              {isEs
                ? "Todos los precios se proporcionan al momento de la reserva e incluyen la entrega, alquiler estándar y recogida. Cargos adicionales pueden aplicar por:"
                : "All prices are provided at the time of booking and include delivery, standard rental, and pickup. Additional charges may apply for:"}
            </p>
            <ul>
              <li>{isEs ? "Exceder los límites de peso" : "Exceeding weight limits"}</li>
              <li>{isEs ? "Días de alquiler extendidos" : "Extended rental days"}</li>
              <li>{isEs ? "Materiales prohibidos" : "Prohibited materials"}</li>
              <li>{isEs ? "Viajes adicionales por acceso bloqueado" : "Additional trips due to blocked access"}</li>
              <li>{isEs ? "Tarifas de permisos (si aplica)" : "Permit fees (if applicable)"}</li>
            </ul>

            <h2>{isEs ? "Cancelaciones y Reembolsos" : "Cancellations and Refunds"}</h2>
            <p>
              {isEs
                ? "Las cancelaciones realizadas 24 horas o más antes de la entrega programada recibirán un reembolso completo. Las cancelaciones dentro de las 24 horas pueden estar sujetas a un cargo por cancelación. Una vez que el contenedor ha sido entregado, no se ofrecen reembolsos."
                : "Cancellations made 24 hours or more before scheduled delivery will receive a full refund. Cancellations within 24 hours may be subject to a cancellation fee. Once the dumpster has been delivered, no refunds are offered."}
            </p>

            <h2>{isEs ? "Responsabilidad" : "Liability"}</h2>
            <p>
              {isEs
                ? "El cliente es responsable de cualquier daño a la propiedad causado por el uso del contenedor. Dumpster Champs no es responsable de daños a superficies, entradas de vehículos o césped causados por la colocación del contenedor. Se recomienda usar tablas de madera debajo del contenedor para proteger las superficies."
                : "The customer is responsible for any property damage caused by the use of the dumpster. Dumpster Champs is not liable for damage to surfaces, driveways, or lawns caused by dumpster placement. We recommend using plywood boards under the dumpster to protect surfaces."}
            </p>

            <h2>{isEs ? "Indemnización" : "Indemnification"}</h2>
            <p>
              {isEs
                ? "Usted acepta indemnizar y mantener indemne a Dumpster Champs de cualquier reclamo, daño, pérdida o gasto que surja de su uso del servicio o violación de estos términos."
                : "You agree to indemnify and hold harmless Dumpster Champs from any claims, damages, losses, or expenses arising from your use of the service or violation of these terms."}
            </p>

            <h2>{isEs ? "Cambios a los Términos" : "Changes to Terms"}</h2>
            <p>
              {isEs
                ? "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigencia inmediatamente después de su publicación en nuestro sitio web. El uso continuado del servicio después de cualquier cambio constituye la aceptación de los nuevos términos."
                : "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of the service after any changes constitutes acceptance of the new terms."}
            </p>

            <h2>{isEs ? "Ley Aplicable" : "Governing Law"}</h2>
            <p>
              {isEs
                ? "Estos términos se regirán e interpretarán de acuerdo con las leyes de los Estados Unidos, sin tener en cuenta sus disposiciones sobre conflicto de leyes."
                : "These terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions."}
            </p>

            <h2>{isEs ? "Contáctenos" : "Contact Us"}</h2>
            <p>
              {isEs
                ? "Si tiene alguna pregunta sobre estos Términos de Servicio, contáctenos:"
                : "If you have any questions about these Terms of Service, please contact us:"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@dumpsterchamps.com">support@dumpsterchamps.com</a>
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
          { name: "Terms of Service", url: "https://www.dumpsterchamps.com/terms" },
        ]}
      />
    </>
  );
}
