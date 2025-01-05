import { Stack } from 'expo-router'

const Layout = () => {
  return (
   <Stack>
    <Stack.Screen name="home" options={{headerTitle: "Shopping List",  headerTitleAlign: 'center'}}/>
   </Stack>
  )
}

export default Layout