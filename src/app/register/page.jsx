import RegisterForm from "@/app/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-full flex justify-center mt-32">
      <div className="w-2/5 md:-mt-32 bg-orange-600 p-20 rounded-full  text-gray-900">
        <RegisterForm />
      </div>
    </div>
  );
}
