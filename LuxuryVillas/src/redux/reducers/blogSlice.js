import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://localhost:7141/api/Articoli";


export const fetchArticoli = createAsyncThunk(
  "blog/fetchArticoli",
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Errore nel caricamento degli articoli");
    }
    return await response.json();
  }
);


export const fetchArticoloById = createAsyncThunk(
  "blog/fetchArticoloById",
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Errore nel caricamento del dettaglio articolo");
    }
    return await response.json();
  }
);

export const updateArticolo = createAsyncThunk(
  "blog/updateArticolo",
  async ({ id, ...data }, { getState }) => {
    const state = getState();
    const token = state.auth.token;

    const response = await fetch(`https://localhost:7141/api/Articoli/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });


    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Errore ${response.status}: ${error}`);
    }

    const text = await response.text();  
    return text ? JSON.parse(text) : {};  
  }
);


const blogSlice = createSlice({
  name: "blog",
  initialState: {
    articoli: [],
    articoloSingolo: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticoli.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticoli.fulfilled, (state, action) => {
        state.loading = false;
        state.articoli = action.payload;
      })
      .addCase(fetchArticoli.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchArticoloById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticoloById.fulfilled, (state, action) => {
        state.loading = false;
        state.articoloSingolo = action.payload;
      })
      .addCase(fetchArticoloById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateArticolo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateArticolo.fulfilled, (state, action) => {
        state.loading = false;
        state.articoloSingolo = action.payload;
      })
      .addCase(updateArticolo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
  

});

export default blogSlice.reducer;
