export function PolicyText() {
  return (
    <div className="p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-foreground border-b pb-3">Data Treatment Policy</h2>
      <p className="text-sm text-muted-foreground mb-8">Last updated: July 26, 2024</p>
      
      <div className="space-y-6 text-foreground/90">
        <section>
          <p>
            This Privacy Policy describes how <strong>PrivacyPolicySigner App</strong> ("we", "us", or "our") collects, uses, and discloses your personal information when you use our services to accept data treatment policies. Your privacy is important to us.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-primary">1. Information We Collect</h3>
          <p>
            To record your acceptance of data treatment policies, we collect the following types of personal information:
          </p>
          <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
            <li><strong>Full Name:</strong> Your complete legal name.</li>
            <li><strong>Identification Number:</strong> Your national ID, cedula, or other official identification number.</li>
            <li><strong>Digital Signature:</strong> A digital representation of your signature, drawn by you on this platform.</li>
            <li><strong>Timestamp of Acceptance:</strong> The date and time you accept the policy.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-primary">2. How We Use Your Information</h3>
          <p>
            The personal information collected is used solely for the following purposes:
          </p>
          <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
            <li>To create a verifiable record of your consent to the specific data treatment policy presented.</li>
            <li>For internal record-keeping and administrative purposes by the entity whose policy you are accepting.</li>
            <li>To comply with applicable legal and regulatory obligations that require proof of consent.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-primary">3. Data Storage and Security</h3>
          <p>
            Your information, including your full name, identification number, and digital signature, is handled with care. 
            <strong>For the current version of this application, all data you provide is stored locally within your web browser's storage (localStorage). It is not transmitted to or stored on any external server.</strong>
          </p>
          <p className="mt-2">
            This local storage approach means:
          </p>
          <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
            <li>Data persistence is limited to your browser and device. Clearing your browser data will remove this information.</li>
            <li>If this application were to be integrated with a backend database, this section would be updated to reflect server-side storage and security measures.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-primary">4. Your Rights</h3>
          <p>
            Given the local storage implementation:
          </p>
          <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
            <li><strong>Access and Correction:</strong> You can conceptually access and manage your data by reviewing what you've entered before submission. Since it's local, there's no central point for formal access requests through this app.</li>
            <li><strong>Deletion:</strong> You can delete the stored acceptance records by clearing your browser's localStorage for this site.</li>
          </ul>
          <p className="mt-2">
            If this application involved server-side storage, you would typically have rights to access, rectify, erase, restrict processing, data portability, and object to processing, subject to applicable laws.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-primary">5. Acceptance of These Terms</h3>
          <p>
            By providing your full name, identification number, and digitally drawn signature, and by clicking the "Accept Policy" button (or similarly labeled button), you explicitly consent to the collection and local storage of this information as described in this Privacy Policy and signify your agreement to the terms of the data treatment policy you are accepting.
          </p>
          <p className="mt-2">
            If you do not agree with this policy or the terms of the data treatment policy being presented, please do not provide your information or use this signature service.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-primary">6. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>
      </div>
    </div>
  );
}
