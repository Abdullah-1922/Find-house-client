import { ProfileUpdateForm } from './ProfileUpdateForm';

export default function Setting() {
  return (
    <div className="flex flex-col space-y-5 border rounded-md p-2 md:p-5">
      <h1 className="text-2xl font-bold mb-5">Update Your Profile</h1>
      <ProfileUpdateForm />
    </div>
  );
}
