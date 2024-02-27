import { Datum } from "../model/MemberModel";

export async function getMemberData() {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}members`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status === 200) {
      const data = await resp.json();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function createMember(data: Datum) {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (resp.status === 200) {
      const data = await resp.json();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function searchMemberData(search: string) {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}members/${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.status === 200) {
      const data = await resp.json();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function updateMember(mid: String, data: Datum) {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}member/${mid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (resp.status === 200) {
      const data = await resp.json();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function deleteMember(mid: String) {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}member/${mid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status === 200) {
      const data = await resp.json();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}
