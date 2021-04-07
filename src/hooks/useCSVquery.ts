import { useQuery } from 'react-query';
import { exportCSVtoFile } from '../API';
import { useAppSelector } from './reduxHooks';

const useStats = (queryCSVurl: string) => {
  const { userAuthID } = useAppSelector((state) => state.user);
  const { isFetching: generatingCSV, refetch: refetchCSV } = useQuery(
    'query csv',
    () => exportCSVtoFile(userAuthID!, queryCSVurl),
    {
      enabled: false,
    },
  );

  return { generatingCSV, refetchCSV };
};

export default useStats;
