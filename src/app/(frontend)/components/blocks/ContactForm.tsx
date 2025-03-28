// src/app/(frontend)/components/blocks/ContactForm.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image' // Ensure Next.js Image is imported

export type ContactFormBlockProps = {
  heading: string
  subheading?: string
  image?: {
    url: string
    alt: string
  }
  fields: Array<{
    name: string
    label: string
    type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio'
    required: boolean
    options?: Array<{
      label: string
      value: string
    }>
  }>
  submitLabel: string
  successMessage?: string // Changed type from any to string
}

export const ContactFormBlock: React.FC<ContactFormBlockProps> = ({
  heading,
  subheading,
  image,
  fields,
  submitLabel,
  successMessage,
}) => {
  // Use a more specific type for form data
  type FormDataType = {
    [key: string]: string | boolean;
  };

  const [formData, setFormData] = useState<FormDataType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, type } = e.target;

    // Correctly handle checkbox changes
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Replace with your form submission logic (e.g., server action or API route)
      const response = await fetch('/api/contact', {
        // Example API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        // Consider more specific error handling based on response body if available
        const errorData = await response
          .json()
          .catch(() => ({ message: 'Failed to submit form. Please try again.' }))
        throw new Error(errorData.message || 'Failed to submit form')
      }

      setIsSubmitted(true)
      setFormData({}) // Clear form on success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper functions to render different field types
  const renderTextarea = (field: typeof fields[number]) => (
    <textarea
      id={field.name}
      name={field.name}
      required={field.required}
      value={typeof formData[field.name] === 'string' ? formData[field.name] as string : ''}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      rows={4}
    />
  );

  const renderSelect = (field: typeof fields[number]) => (
    <select
      id={field.name}
      name={field.name}
      required={field.required}
      value={typeof formData[field.name] === 'string' ? formData[field.name] as string : ''}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Select an option</option>
      {field.options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const renderCheckbox = (field: typeof fields[number]) => (
    <div className="flex items-center">
      <input
        id={field.name}
        name={field.name}
        type="checkbox"
        required={field.required}
        checked={typeof formData[field.name] === 'boolean' ? formData[field.name] as boolean : false}
        onChange={handleChange}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={field.name} className="ml-2 block text-sm text-gray-900">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  );

  const renderRadio = (field: typeof fields[number]) => (
    <fieldset>
      <legend className="sr-only">{field.label}</legend> {/* Accessibility */}
      <div className="space-y-2">
        {field.options?.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${field.name}-${option.value}`}
              name={field.name} // Same name for all radios in group
              type="radio"
              required={field.required}
              value={option.value}
              checked={formData[field.name] === option.value}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor={`${field.name}-${option.value}`}
              className="ml-2 block text-sm text-gray-900"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );

  const renderDefaultInput = (field: typeof fields[number]) => (
    <input
      id={field.name}
      name={field.name}
      type={field.type}
      required={field.required}
      value={typeof formData[field.name] === 'string' ? formData[field.name] as string : ''}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  );

  // Render field based on type
  const renderField = (field: typeof fields[number]) => {
    switch (field.type) {
      case 'textarea':
        return renderTextarea(field);
      case 'select':
        return renderSelect(field);
      case 'checkbox':
        return renderCheckbox(field);
      case 'radio':
        return renderRadio(field);
      default:
        return renderDefaultInput(field);
    }
  };

  // Render success message if form was submitted successfully
  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto my-12">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Thank you!</h2>
        {successMessage ? (
          // Ensure successMessage comes from a trusted source
          <div className="prose" dangerouslySetInnerHTML={{ __html: successMessage }} />
        ) : (
          <p>Your message has been sent successfully.</p>
        )}
      </div>
    )
  }

  // Determine classes for form container (ternary is fine here)
  const formContainerClasses = image ? 'md:w-1/2' : 'w-full'

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto my-12">
      <div className="flex flex-col md:flex-row gap-8">
        {image && (
          // Parent needs positioning context and defined size for fill
          <div className="md:w-1/2 relative h-80 md:h-auto md:aspect-square">
            {' '}
            {/* Example sizing */}
            <Image // Use uppercase Image component
              src={image.url}
              alt={image.alt}
              fill // Use fill prop
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority // Optional: If image is LCP
            />
          </div>
        )}
        <div className={formContainerClasses}>
          {' '}
          {/* Use variable or keep inline ternary */}
          <h2 className="text-3xl font-bold mb-4">{heading}</h2>
          {subheading && <p className="text-gray-600 mb-6">{subheading}</p>}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
              role="alert"
            >
              <p>{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                {/* Don't render label separately for checkbox if input is nested */}
                {field.type !== 'checkbox' && (
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                )}

                {renderField(field)}
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : submitLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactFormBlock; // Default export for convenience
