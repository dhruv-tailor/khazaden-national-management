import 'primereact/resources/themes/lara-dark-teal/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

function App() {

  let items: MenuItem[] = [
    {separator: true},
    {
      label: 'New', 
      icon: 'pi pi-fw pi-plus',
      url: '/NewGame'
    },
    {label: 'Load', icon: 'pi pi-fw pi-folder'},
    {label: 'Quit', icon: 'pi pi-fw pi-times'}
  ];

  return (
   <>
    <div className='flex align-content-center justify-content-center w-full'>
      <Menu model={items} />
    </div>
   </>
  );
}

export default App;