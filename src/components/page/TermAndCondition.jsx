import React from "react";

function TermAndCondition() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-10 md:px-[200px]">
      <div className="max-w-4xl mx-auto  ">
        {/* Header Section */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Terms and Conditions
        </h1>
        <p className="text-gray-600 mb-8">
          Please read these Terms and Conditions ("Terms", "Terms and
          Conditions") carefully before using the Rajgir Zoo Safari & Nature
          Safari website operated by Fillip Technologies ("us", "we", or "our").
          By accessing or using the website, you agree to be bound by these
          terms. If you disagree with any part of the terms, then you may not
          access the service.
        </p>

        {/* General Terms */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            1. General Terms
          </h2>
          <p className="text-gray-600 mb-4">
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement. In addition, when
            using this website's services, you shall be subject to any posted
            guidelines or rules applicable to such services, which may be posted
            and modified from time to time. All such guidelines or rules are
            hereby incorporated by reference into the Terms of Service.
          </p>
          <p className="text-gray-600">
            Any participation in this service will constitute acceptance of this
            agreement. If you do not agree to abide by the above, please do not
            use this service.
          </p>
        </section>

        {/* Booking Terms */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            2. Booking Terms
          </h2>
          <ul className="list-disc ml-6 text-gray-600 space-y-4">
            <li>
              Visitors must book tickets in advance through our online booking
              system. Tickets are subject to availability and confirmation of
              the reservation.
            </li>
            <li>
              All visitors are required to carry valid identification during the
              visit, which may be checked at the entry point.
            </li>
            <li>
              Ticket cancellations are allowed up to 48 hours before the
              scheduled time slot. Any cancellation request made within 48 hours
              will not be eligible for a refund.
            </li>
            <li>
              No rescheduling or transfer of tickets is allowed once the booking
              is confirmed.
            </li>
          </ul>
        </section>

        {/* Safari Guidelines */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            3. Safari Guidelines
          </h2>
          <ul className="list-disc ml-6 text-gray-600 space-y-4">
            <li>
              Visitors must report to the boarding point at least 30 minutes
              before their reserved time slot.
            </li>
            <li>
              Entry to restricted areas is strictly prohibited. Visitors are
              advised to follow all instructions provided by staff and safari
              guides.
            </li>
            <li>
              Any harmful actions towards animals or violation of park rules may
              result in immediate removal from the premises and forfeiture of
              the ticket without refund.
            </li>
            <li>
              Photography is permitted in designated areas only. Visitors are
              advised to avoid flash photography near animals to avoid causing
              them distress.
            </li>
          </ul>
        </section>

        {/* Liability */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            4. Liability
          </h2>
          <p className="text-gray-600 mb-4">
            We are not liable for any personal injury, loss, or damage to
            property incurred during your visit to Rajgir Zoo Safari & Nature
            Safari. Visitors are advised to take care of their belongings and
            follow all safety protocols during their visit.
          </p>
          <p className="text-gray-600">
            The management reserves the right to refuse entry to any individual
            who fails to comply with the safari guidelines and safety measures.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            5. Governing Law
          </h2>
          <p className="text-gray-600">
            These Terms shall be governed and construed in accordance with the
            laws of India, without regard to its conflict of law provisions.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            6. Changes to Terms
          </h2>
          <p className="text-gray-600">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. It is your responsibility to review these
            Terms periodically. Your continued use of the website following the
            posting of any changes to these Terms constitutes acceptance of
            those changes.
          </p>
        </section>

       
      </div>
    </div>
  );
}

export default TermAndCondition;
