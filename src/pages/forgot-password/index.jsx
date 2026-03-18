'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Reset password email sent to:', email);
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-3xl font-serif font-bold text-white tracking-wider">
              AURA<span className="text-amber-500">.</span>
            </span>
          </Link>
          <h1 className="text-4xl font-serif text-white mb-2">Reset Password</h1>
          <p className="text-slate-400">We'll help you get back to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {!isSubmitted ? (
            <>
              {/* Info Box */}
              <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start space-x-3">
                <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-amber-100">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-white">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={20} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-amber-600/30"
                >
                  <span>{isLoading ? 'Sending...' : 'Send Reset Link'}</span>
                  {!isLoading && <ArrowRight size={18} />}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="px-3 text-sm text-slate-400">Or</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              {/* Back to Login */}
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="w-full border border-white/20 hover:bg-white/10 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  Back to Sign In
                </Link>
                <p className="text-center text-sm text-slate-400">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-amber-400 hover:text-amber-300 transition-colors">
                    Create one
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-emerald-500/20 border border-emerald-500/50 p-4">
                    <CheckCircle className="text-emerald-400" size={48} />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-serif text-white">Check Your Email</h2>
                  <p className="text-slate-400">
                    We've sent a password reset link to:
                  </p>
                  <p className="text-amber-400 font-semibold break-all">
                    {email}
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-sm text-slate-400">
                    The link will expire in 24 hours. Please check your spam folder if you don't see the email.
                  </p>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail('');
                    }}
                    className="w-full border border-white/20 hover:bg-white/10 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    Try Another Email
                  </button>

                  <Link
                    href="/login"
                    className="block w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-center shadow-lg shadow-amber-600/30"
                  >
                    Back to Sign In
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-400">
          <p>
            Need help?{' '}
            <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
