import { IconFlag } from '../shared/ui/Icon';
import ProgressNavigation from '../shared/ui/ProgressNavigation';

const App = () => {
  return (
    <div className='m-4 bg-gray-100 p-4'>
      <ProgressNavigation activeId={3} onChange={console.log}>
        <ProgressNavigation.Item
          itemId={0}
          progress={100}
          title='15 сент'
          subtitle='понедельник'
        />
        <ProgressNavigation.Item
          itemId={1}
          progress={100}
          title='16 сент'
          subtitle='вторник'
        />
        <ProgressNavigation.Item
          itemId={2}
          progress={100}
          title='17 сент'
          subtitle='среда'
        />
        <ProgressNavigation.Item
          itemId={3}
          progress={35}
          title='18 сент'
          subtitle='четверг'
        />
        <ProgressNavigation.Item
          itemId={4}
          progress={75}
          title='19 сент'
          subtitle='пятница'
        />
        <ProgressNavigation.Item
          itemId={5}
          progress={100}
          title='20 сент 🌴'
          subtitle='суббота'
        />
        <ProgressNavigation.Item
          itemId={6}
          progress={0}
          disabled
          title='21 сент 🌴'
          subtitle='воскресенье'
        />
        <ProgressNavigation.Item
          itemId={7}
          progress={0}
          disabled
          title='22 сент'
          subtitle='понедельник'
        />
        <ProgressNavigation.Item
          completedIcon={<IconFlag />}
          disabled
          onlyIcon
          itemId={8}
          progress={100}
        />
      </ProgressNavigation>
    </div>
  );
};

export default App;
