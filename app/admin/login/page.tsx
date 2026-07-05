import { AdminLoginForm } from './login-form'

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-4xl">🔐</span>
          <h1 className="mt-3 text-2xl font-bold text-stone-900">Admin Access</h1>
          <p className="mt-1 text-stone-500 text-sm">Enter your PIN to continue</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  )
}
