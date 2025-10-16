import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const inputVariants = cva(
  'w-full text-white placeholder-gray-400 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white/5 border border-white/10 rounded-lg',
        newsletter: 'bg-white/5 border border-white/10 rounded-lg',
        search: 'bg-white/10 border border-white/20 rounded-lg',
      },
      inputSize: {
        sm: 'px-3 py-2 text-sm',
        default: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
      },
      hasIcon: {
        true: 'pl-10 pr-4',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
  inputSize: 'default',
      hasIcon: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, hasIcon, label, error, icon, required, ...props }, ref) => {
    const inputId = props.id || props.name || 'input';
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {label} {required && <span className="text-red-400">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400">
                {icon}
              </div>
            </div>
          )}
          <input
            id={inputId}
            className={cn(inputVariants({ variant, inputSize, hasIcon: !!icon, className }))}
            ref={ref}
            aria-required={required}
            aria-invalid={!!error}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

