export const DecryptFunction = async (encodedParts) => {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#*%!$';
  const shift = 5;

  // Step 1: Combine parts back into the full encoded string
  const fullEncodedString =
    encodedParts?.date +
    encodedParts?.age +
    encodedParts?.gender +
    encodedParts?.arn_id;

  // Step 2: Reverse the full encoded string
  const reversedOnce = await fullEncodedString?.split('')?.reverse()?.join('');

  // Step 3: Shift characters back by -5
  let unshifted = '';
  for (let ch of reversedOnce) {
    const idx = charset?.indexOf(ch);
    if (idx !== -1) {
      const newIndex = (idx - shift + charset.length) % charset.length;
      unshifted += charset[newIndex];
    } else {
      unshifted += ch;
    }
  }

  // Step 4: Reverse the string again
  const originalReversed = unshifted?.split('')?.reverse()?.join('');

  // Step 5: Split by '#$' and remove empty strings
  const fields = originalReversed?.split('#$')?.filter(Boolean);

  const newObj = {};

  fields?.forEach((part, index) => {
    const key = `part${index + 1}`;
    const trimmedPart = part?.trim();

    // Check if part looks like an array
    if (trimmedPart?.startsWith('[') && trimmedPart?.endsWith(']')) {
      // Replace single quotes with double quotes to make it valid JSON
      const jsonString = trimmedPart?.replace(/'/g, '"');
      try {
        newObj[key] = JSON.parse(jsonString);
      } catch (e) {
        // fallback if JSON.parse fails
        newObj[key] = trimmedPart;
      }
    }
    
    else {
      newObj[key] = trimmedPart;
    }
  });

  return newObj;
};
