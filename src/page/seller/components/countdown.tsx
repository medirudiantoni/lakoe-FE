import { useEffect, useState } from 'react';

type CountdownProps = {
  targetTime: string;
  isPaid: boolean;
};

const Countdown: React.FC<CountdownProps> = ({ targetTime, isPaid }) => {
  const calculateTimeLeft = (): string => {
    const difference = new Date(targetTime).getTime() - new Date().getTime();
    if (isPaid) {
      return 'Pembayaran selesai';
    }
    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return `${hours} jam ${minutes} menit ${seconds} detik`;
    } else {
      return 'Waktu habis';
    }
  };

  const [timeLeft, setTimeLeft] = useState<string>(calculateTimeLeft());

  useEffect(() => {
    if (isPaid) {
      setTimeLeft('Pembayaran selesai');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime, isPaid]);

  return <div>{timeLeft}</div>;
};

export default Countdown;
