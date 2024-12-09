const Page = () => {
  return (
    <div className="container flex flex-col mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Welcome to our Privacy Policy page. Your privacy is critically important
        to us.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
      <p className="mb-4">
        We collect various types of information in connection with the services
        we provide, including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          Personal identification information (Name, email address, phone
          number, etc.)
        </li>
        <li>Usage data and cookies</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">How We Use Information</h2>
      <p className="mb-4">
        We use the collected information for various purposes, such as:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>To provide and maintain our service</li>
        <li>To notify you about changes to our service</li>
        <li>To provide customer support</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at:
      </p>
      <p className="font-semibold">privacy@example.com</p>
    </div>
  );
};

export default Page;
