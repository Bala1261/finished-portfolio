import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  href,
  className = '',
  icon,
  ...props 
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed will-change-transform';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-700 to-primary-600 text-white shadow-md hover:shadow-lg hover:from-primary-800 hover:to-primary-700',
    secondary: 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100',
    outline: 'border-2 border-primary-600 text-primary-600 hover:border-primary-700 hover:text-primary-700 dark:border-primary-500 dark:text-primary-500',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClassName}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ y: 0, scale: 0.99 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={combinedClassName}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ y: 0, scale: 0.99 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;
