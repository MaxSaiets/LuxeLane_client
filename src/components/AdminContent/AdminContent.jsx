import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";


const AdminMainContent = () => {

    return (
    <Box sx={{ width: "100%" }}>
      {/* Привітання */}
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Вітаємо в адмін-панелі!
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: '40px' }}>
        Тут ви зможете керувати усіма аспектами вашого магазину: від замовлень та користувачів до аналітики продажів і управління контентом. Ось кілька ключових показників для вашого огляду:
      </Typography>

      {/* Ключові показники */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h5">Кількість користувачів</Typography>
              <Typography variant="h6" color="primary">12,345</Typography>
              <Typography variant="body2" color="text.secondary">Зареєстровані користувачі</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h5">Нові замовлення</Typography>
              <Typography variant="h6" color="primary">65</Typography>
              <Typography variant="body2" color="text.secondary">За останні 24 години</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h5">Доходи</Typography>
              <Typography variant="h6" color="primary">₴124,500</Typography>
              <Typography variant="body2" color="text.secondary">Сьогодні</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h5">Незавершені замовлення</Typography>
              <Typography variant="h6" color="primary">5</Typography>
              <Typography variant="body2" color="text.secondary">Потребують уваги</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Остання активність */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Останні дії</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Додані нові товари</Typography>
                <Typography variant="body2" color="text.secondary">
                  15 нових товарів було додано до категорії "Електроніка" за останню добу.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Завершені замовлення</Typography>
                <Typography variant="body2" color="text.secondary">
                  50 замовлень було успішно завершено за останню годину.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Керування контентом */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Швидке керування контентом</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Button variant="contained" color="primary" fullWidth>
              Додати новий товар
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button variant="contained" color="secondary" fullWidth>
              Керувати категоріями
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Статистика користувачів і замовлень */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Статистика користувачів та замовлень</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Користувачі</Typography>
                <Typography variant="body2" color="text.secondary">
                  3,456 активних користувачів за останній місяць.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Замовлення</Typography>
                <Typography variant="body2" color="text.secondary">
                  120 замовлень було отримано протягом останнього тижня.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Аналітика та налаштування */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Налаштування та аналітика</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Button variant="outlined" color="primary" fullWidth>
              Переглянути аналітику продажів
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button variant="outlined" color="secondary" fullWidth>
              Перейти до налаштувань магазину
            </Button>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
};

export default AdminMainContent;