export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'default',
  className = '',
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-[#A0D2EB] text-white hover:bg-[#8BC1DA] focus:ring-[#A0D2EB]',
    secondary: 'bg-[#B2D7D0] text-gray-900 hover:bg-[#9FC5BE] focus:ring-[#B2D7D0]',
    outline: 'border border-[#A0D2EB] bg-transparent hover:bg-[#A0D2EB] hover:text-white focus:ring-[#A0D2EB]',
    destructive: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    ghost: 'hover:bg-[#A0D2EB]/10 hover:text-[#A0D2EB]',
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-xs',
    default: 'h-9 px-4 py-2 text-sm',
    lg: 'h-10 px-8 text-base',
    icon: 'h-9 w-9',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
