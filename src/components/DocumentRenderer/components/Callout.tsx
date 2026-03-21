interface Props {
  message: React.ReactNode;
  intent?: 'info' | 'warning';
}

export const Callout: React.FC<Props> = ({ message, intent = 'warning' }) => (
  <div
    className={`p-4 rounded ${intent === 'info' ? 'bg-blue-100' : 'bg-yellow-100'}`}
  >
    {message}
  </div>
);
