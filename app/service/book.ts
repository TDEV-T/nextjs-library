import { Datum } from "../model/BookModel";

export async function getBookData() {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}books`, {
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

export async function searchBookData(search: string) {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}books/${search}`,
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

export async function createBook(data: Datum) {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}book`, {
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
export async function updateBook(bid: String, data: Datum) {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}book/${bid}`, {
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

export async function deleteBook(bid: String) {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}book/${bid}`, {
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
