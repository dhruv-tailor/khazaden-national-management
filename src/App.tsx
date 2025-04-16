import 'primereact/resources/themes/soho-dark/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useNavigate } from "react-router";
import { Card } from 'primereact/card';

function App() {
  let navigate = useNavigate();

  let items: MenuItem[] = [
    {
      label: 'New Game', 
      icon: 'pi pi-fw pi-plus',
      className: 'w-full',
      command: () => {
        navigate('/NewGame');
      }
    },
    {
      label: 'Load Game', 
      icon: 'pi pi-fw pi-folder-open',
      className: 'w-full',
      command: () => {
        navigate('/LoadGame');
      }
    },
    {
      label: 'Quit Game', 
      icon: 'pi pi-fw pi-power-off',
      className: 'w-full text-red-500'
    }
  ];

  return (
    <div className='flex flex-column align-items-center justify-content-center min-h-screen surface-ground'>
      <Card className="shadow-8">
        <div className="flex flex-column gap-4 px-4 py-2">
          <div className="text-center">
            <h1 className="text-5xl font-bold m-0 mb-2">Khazaden</h1>
            <p className="text-xl text-500 m-0">National Management</p>
          </div>
          <Menu model={items} className="w-20rem border-none surface-card" />
        </div>
      </Card>
    </div>
  );
}

export default App;