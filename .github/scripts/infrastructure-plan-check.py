import json
import sys

from argon2 import PasswordHasher
from argon2.exceptions import InvalidHashError, VerificationError

plan = json.load(open(sys.argv[1]))
hasher = PasswordHasher()


def matches(value, stored):
    if value == stored:
        return True
    if not isinstance(stored, str) or not stored.startswith("$argon2"):
        return False
    try:
        return hasher.verify(stored, value or "")
    except (VerificationError, InvalidHashError):
        return False


def changed_secrets(before, after):
    before = before.get("secret_environment_variables") or {}
    after = after.get("secret_environment_variables") or {}
    return [key for key in sorted(set(before) | set(after)) if key not in before or key not in after or not matches(after[key], before[key])]


def changed_attributes(before, after):
    return [key for key in sorted(set(before) | set(after)) if key != "secret_environment_variables" and before.get(key) != after.get(key)]


def real_changes(change):
    before = change["change"].get("before") or {}
    after = change["change"].get("after") or {}
    if change["change"]["actions"] != ["update"]:
        return ["action " + ", ".join(change["change"]["actions"])]
    return [f"attribut {key} modifié" for key in changed_attributes(before, after)] + [f"variable secrète {key} modifiée" for key in changed_secrets(before, after)]


pending = [change for change in plan.get("resource_changes", []) if change["change"]["actions"] != ["no-op"]]
failures = 0
for change in pending:
    changes = real_changes(change)
    if not changes:
        print(f"{change['address']} : seules les marques de sensibilité du state changent")
        continue
    failures += 1
    for description in changes:
        print(f"{change['address']} : {description}")

sys.exit(10 if failures else 0)
