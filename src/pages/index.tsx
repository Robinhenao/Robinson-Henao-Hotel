import Dashboard from '@/src/components/organism/Dashboard';
import { Button } from '@/src/components/ui/button';
import { postEmail } from '@/src/utils/api';

export default function Home() {
  async function handleMail() {
    await postEmail({
      name: 'Jhon Doe',
      email: 'arangojp1@gmail.com',
      password: '12 34 56',
    });
  }
  return (
    <div className=''>
      <Button type='button' onClick={handleMail}>
        Send Mail
      </Button>
      <Dashboard />
    </div>
  );
}
