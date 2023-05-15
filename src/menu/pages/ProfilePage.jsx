import { MenuLayout } from "../layout/MenuLayout";
import { ProfileView } from "../views";

export const ProfilePage = () => {
  return (
    <>
      <MenuLayout>
        <ProfileView />
        {/* <NoteView /> */}
      </MenuLayout>
    </>
  );
};
