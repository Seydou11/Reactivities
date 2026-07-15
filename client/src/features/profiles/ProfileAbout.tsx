import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useprofile";
import TextInput from "../../app/shared/components/TextInput";
import { profileSchema, type ProfileSchema } from "../../lib/schemas/profileSchema";

export default function ProfileAbout() {
  const { id } = useParams();
  const { profile, isCurrentUser, updateProfile } = useProfile(id);
  const [editing, setEditing] = useState(false);
  const { control, reset, handleSubmit } = useForm<ProfileSchema>({ resolver: zodResolver(profileSchema), mode: "onTouched" });
  useEffect(() => { if (profile) reset({ displayName: profile.displayName, bio: profile.bio ?? "" }); }, [profile, reset]);
  const cancel = () => { reset({ displayName: profile?.displayName ?? "", bio: profile?.bio ?? "" }); setEditing(false); };
  return <Box>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}><Typography variant="h5">About {profile?.displayName}</Typography>{isCurrentUser && <Button onClick={editing ? cancel : () => setEditing(true)}>{editing ? "Cancel" : "Edit profile"}</Button>}</Box>
    <Divider sx={{ my: 2 }} />
    {editing ? <Box component="form" onSubmit={handleSubmit(data => updateProfile.mutate(data, { onSuccess: () => setEditing(false) }))} sx={{ display: "flex", flexDirection: "column", gap: 2 }}><TextInput label="Display Name" name="displayName" control={control} /><TextInput label="Add your bio" name="bio" control={control} multiline rows={5} /><Button type="submit" variant="contained" disabled={updateProfile.isPending}>Update profile</Button></Box> : <Box sx={{ overflow: "auto", maxHeight: 350 }}><Typography sx={{ whiteSpace: "pre-wrap" }}>{profile?.bio || "No description added yet"}</Typography></Box>}
  </Box>;
}