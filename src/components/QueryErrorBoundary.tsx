import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

type QueryErrorBoundaryProps = {
  children: React.ReactNode;
  FallbackComponent: React.ComponentType<FallbackProps>;
};

const QueryErrorBoundary = ({
  children,
  FallbackComponent,
}: QueryErrorBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={FallbackComponent}>
      {children}
    </ErrorBoundary>
  );
};

export default QueryErrorBoundary;
