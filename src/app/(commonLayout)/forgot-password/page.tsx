import React from 'react';
import ForgotPasswordForm from '../_components/module/forgatPsssword/forgotPasswordForm';
import Banner from '../_components/shared/banner';

export default function ForgatPasswordPage() {
  return (
    <div>
      <Banner pageName="Forgot Password" />
      <div className="flex items-center justify-center my-10 md:my-20">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
