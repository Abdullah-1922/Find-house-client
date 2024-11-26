import ChangePasswordForm from './changePasswordForm';
import { ProfileUpdateForm } from './ProfileUpdateForm';

export default function Setting() {
  return (
    <div className="space-y-5 mb-10">
      <div className="flex flex-col space-y-5 border rounded-md p-2 md:p-5">
        <ProfileUpdateForm />
      </div>
      <div className="flex flex-col space-y-5 border rounded-md p-2 md:p-5">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
