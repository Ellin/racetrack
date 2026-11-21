const requiredKeys = ["RECEPTIONIST_KEY", "OBSERVER_KEY", "SAFETY_KEY"];
const missingKeys = requiredKeys.filter((keyName) => !process.env[keyName]);

// Check that all employee access keys are set
if (missingKeys.length > 0) {
    console.log(`Missing environment variables: ${missingKeys.join(", ")}`);
    process.exit(1);
}

export const keys = {
    receptionist: process.env.RECEPTIONIST_KEY,
    observer: process.env.OBSERVER_KEY,
    safety: process.env.SAFETY_KEY,
};