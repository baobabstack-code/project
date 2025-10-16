import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const textareaVariants = cva(
  'w-full text-white placeholder-gray-400 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none',
  {
    variants: {
      variant: {
        default: 'bg-white/5 border border-white/10 rounded-lg',
        comment: 'bg-white/5 border border-white/10 rounded-lg',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        default: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, label, error, required, ...props }, ref) => {
    const textareaId = props.id || props.name || 'textarea';
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {label} {required && <span className="text-red-400">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(textareaVariants({ variant, size, className }))}
          ref={ref}
          aria-required={required}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;

