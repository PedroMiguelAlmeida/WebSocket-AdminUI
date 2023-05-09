import { useTheme,Box } from "@mui/material";
import { useGetUsersQuery,useGetRoomsQuery } from "../../state/api";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";


const Namespaces = () => {
  // {setSelectedLink,link}
  // const {
  //   state: { rooms },
  //   dispatch,
  // } = useValue()

  // useEffect(()=>{
  //   setSelectedLink(link);
  //   if (rooms.length===0) getRooms(dispatch)

  // },[]);
  // const columns = useMemo(()=>[
  //   {field:'roomName',headerName:'Name',flex:1}
  // ],[])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);





  return (
    <Box>
      <Header title="Namespaces" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >

      </Box>
    </Box>
  );
};

export default Namespaces;
