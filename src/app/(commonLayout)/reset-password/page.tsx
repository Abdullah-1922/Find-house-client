import React from 'react';
import ResetPasswordForm from '../_components/module/forgatPsssword/resetPasswordForm';
import Banner from '../_components/shared/banner';

export default function ResetPassword({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  console.log('searchParams==>', searchParams);
  const { email } = searchParams;

  if (!email) {
    return (
      <div className="text-center h-[70vh] flex items-center justify-center text-2xl font-bold">
        Invalid or missing reset token.
      </div>
    );
  }

  return (
    <div>
      <Banner pageName="Reset Password" />
      <div className="flex items-center justify-center my-10 md:my-20">
        <ResetPasswordForm email={email} />
      </div>
    </div>
  );
}
