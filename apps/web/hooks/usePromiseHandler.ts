import { Result } from "oxide.ts/dist";
import { useState } from "react";

export function usePromiseHandler<T>(
  promise: () => Promise<T>
): [() => Promise<void>, boolean] {
  const [loading, setLoading] = useState(false);

  const handlePromise = async () => {
    setLoading(true);

    const resultSafe = await Result.safe(promise());

    if (resultSafe.isErr()) {
      console.error(resultSafe.unwrapErr());
    }

    setLoading(false);
  };

  return [handlePromise, loading];
}
