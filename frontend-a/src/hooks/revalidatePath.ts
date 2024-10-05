"use server";

import { revalidatePath } from "next/cache";

const handleRevalidatePath = async (path: string) => {
  revalidatePath(path);
};

export default handleRevalidatePath;
