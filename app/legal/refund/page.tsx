import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Refund Policy - Learn to Vibe Code",
  description: "Refund Policy for Learn to Vibe Code course platform",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* DRAFT BANNER */}
        <div className="mb-8 p-4 bg-red-500/20 border-l-4 border-red-500">
          <p className="text-red-400 font-bold">
            ⚠️ DRAFT — Pending Attorney Review
          </p>
          <p className="text-red-300 text-sm mt-2">
            This Refund Policy is pending legal review and should not be
            considered final or binding. Do not use in production until
            attorney approval is obtained.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-white mb-8">Refund Policy</h1>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Course Access (Free)
          </h2>
          <p className="text-slate-300 mb-4">
            The course is offered at no cost. There are no refunds for free course
            access, as no payment is required to enroll.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Donations (Non-Refundable)
          </h2>
          <p className="text-slate-300 mb-4">
            Donations are voluntary contributions to support the course. All
            donations are <strong>non-refundable</strong>. Donations are considered
            final transactions. If you have questions about your donation, please
            contact support within 14 days of the donation.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Accidental Duplicate Donations
          </h2>
          <p className="text-slate-300 mb-4">
            If you believe you have made a duplicate donation in error, please
            contact support within 30 days with proof of the duplicate transaction.
            We will review your case and may issue a refund at our discretion.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Technical Issues
          </h2>
          <p className="text-slate-300 mb-4">
            If a donation was not processed successfully but you were charged, or if
            you experienced a technical issue, please contact support immediately
            with details and we will investigate.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            How to Request a Refund
          </h2>
          <p className="text-slate-300 mb-4">
            To request a refund (if eligible):
          </p>
          <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-2">
            <li>Contact support through the support page</li>
            <li>Provide your email address and donation receipt</li>
            <li>Describe the reason for the refund request</li>
            <li>Include proof of the donation (transaction ID, receipt, etc.)</li>
          </ol>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Refund Timeline
          </h2>
          <p className="text-slate-300 mb-4">
            Approved refunds will be processed within 5–10 business days. The refund
            will be issued to the original payment method. Your bank may take
            additional time to process the refund.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Disputing a Charge
          </h2>
          <p className="text-slate-300 mb-4">
            If you dispute a charge with your payment processor or credit card
            company (a chargeback), we will not be able to grant an additional
            refund. Please contact support before initiating a chargeback.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Contact Support
          </h2>
          <p className="text-slate-300 mb-4">
            For refund questions, please use the support page or email the contact
            provided in your donation receipt.
          </p>

          <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-400 text-sm">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-blue-300 text-sm mt-2">
              This policy is subject to change. We will notify you of significant
              changes via email.
            </p>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
