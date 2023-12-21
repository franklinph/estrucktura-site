import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import registerSocio from '../../../actions/registerSocio';

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
//import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          auspiciante: '',
          nombre: '',
          cedula: '',
          //firstname: '',
          //lastname: '',
          email: '',
          //company: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          auspiciante: Yup.string().max(255).required('Auspiciante es requerido'),
          nombre: Yup.string().max(255).required('Nombre es requerido'),
          cedula: Yup.string().max(255).required('Cédula es requerida'),
          //firstname: Yup.string().max(255).required('First Name is required'),
          //lastname: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Correo no es valido').max(255).required('Correo es requerido'),
          password: Yup.string().max(255).required('Clave es requerida')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          //console.log(values, process.env.REACT_APP_API_URL);
          try {
            setSubmitting(true);
            
            registerSocio(values)
            .then(({ success, data }) => {
              setStatus({ success: success });              
              setSubmitting(false);

              if (success) {
                navigate('/login', {replace: true});
              } else {
                setErrors({ submit: data.message });
              }
            });
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="auspiciante-signup">Id Auspiciante*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.auspiciante && errors.auspiciante)}
                    id="auspiciante-signup"
                    type="text"
                    value={values.auspiciante}
                    name="auspiciante"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="9900000"
                    inputProps={{}}
                  />
                  {touched.auspiciante && errors.auspiciante && (
                    <FormHelperText error id="helper-text-auspiciante-signup">
                      {errors.auspiciante}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="nombre-signup">Nombre*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.nombre && errors.nombre)}
                    id="nombre-signup"
                    type="text"
                    value={values.nombre}
                    name="nombre"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Jose Peréz"
                    inputProps={{}}
                  />
                  {touched.nombre && errors.nombre && (
                    <FormHelperText error id="helper-text-nombre-signup">
                      {errors.nombre}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="cedula-signup">Cédula*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.cedula && errors.cedula)}
                    id="cedula-signup"
                    type="text"
                    value={values.cedula}
                    name="cedula"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="99999999"
                    inputProps={{}}
                  />
                  {touched.cedula && errors.cedula && (
                    <FormHelperText error id="helper-text-cedula-signup">
                      {errors.cedula}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">Nombre*</InputLabel>
                  <OutlinedInput
                    id="firstname-signup"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Apellido*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid> */}
              {/* <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="company-signup">Company</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.company && errors.company)}
                    id="company-signup"
                    value={values.company}
                    name="company"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                    inputProps={{}}
                  />
                  {touched.company && errors.company && (
                    <FormHelperText error id="helper-text-company-signup">
                      {errors.company}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid> */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Correo*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-signup"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Clave*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid> */}
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Registrate
                  </Button>
                </AnimateButton>
              </Grid>
              {/* 
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">Sign up with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> 
              */}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
