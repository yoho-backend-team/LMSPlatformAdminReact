// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid';
// import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
// import FormLabel from '@mui/material/FormLabel';
// import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

// ** Custom Component Import
import CustomTextField from 'components/mui/text-field';

// ** Third Party Imports
// import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

// ** Icon Imports

const defaultValues = {
  plan_type: null,
  users: '',
  users_checkbox: false,
  admins: '',
  admins_checkbox: false,
  teachers: '',
  teachers_checkbox: false,
  batches: '',
  batches_checkbox: false,
  courses: '',
  courses_checkbox: false,
  classes: '',
  classes_checkbox: false,
  community_support: 'false'
  //   checkbox: false
};

const SubscriptionFeatures = () => {
  // ** StatesforInput
  const [studentInputChecked, setStudentInputChecked] = useState(false);
  const [adminInputChecked, setAdminInputChecked] = useState(false);
  const [teachersInputChecked, setTeachersInputChecked] = useState(false);
  const [batchesInputChecked, setBatchesInputChecked] = useState(false);
  const [coursesInputChecked, setCoursesInputChecked] = useState(false);
  const [classesInputChecked, setClassesInputChecked] = useState(false);
  // ** StatesforInputCheckBox
  const [studentInputBoxChecked, setStudentInputBoxChecked] = useState(false);
  const [adminInputBoxChecked, setAdminInputBoxChecked] = useState(false);
  const [teachersInputBoxChecked, setTeachersInputBoxChecked] = useState(false);
  const [batchesInputBoxChecked, setBatchesInputBoxChecked] = useState(false);
  const [coursesInputBoxChecked, setCoursesInputBoxChecked] = useState(false);
  const [classesInputBoxChecked, setClassesInputBoxChecked] = useState(false);

  // const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState('https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg');

  const handleInputImageReset = () => {
    setSelectedImage('');
    setImgSrc('https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg');
  };

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 100,
    height: 100,
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }));
  const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      marginTop: theme.spacing(2)
    }
  }));
  const onSubmit = (data) => {
    console.log('subData', data);
    var bodyFormData = new FormData();
    bodyFormData.append('image', selectedImage);
    console.log(bodyFormData);
    // toast.success('Form Submitted')
  };

  const handleInputImageChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      setSelectedImage(files[0]);
      reader.readAsDataURL(files[0]);
      if (reader.result !== null) {
        setInputValue(reader.result);
      }
    }
  };

  // ** Hooks
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues });

  // const onSubmit = () => toast.success('Form Submitted');

  return (
    <Box p={1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} >
            <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:'center' }}>
              <ImgStyled src={imgSrc} alt="Profile Pic" />
              <div>
                <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                  Upload Profile picture
                  <input
                    hidden
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleInputImageChange}
                    id="account-settings-upload-image"
                  />
                </ButtonStyled>
                <ResetButtonStyled color="error" variant="tonal" onClick={handleInputImageReset}>
                  Reset
                </ResetButtonStyled>
                <Typography sx={{ mt: 4, color: 'text.disabled', justifyContent: 'center', display: 'flex' }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="plan_name"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label="Plan Name"
                  onChange={onChange}
                  placeholder="Basic Plan"
                  error={Boolean(errors.firstName)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.firstName && { helperText: 'This field is required' })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="support-level"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="days"
                  label="Support Level"
                  SelectProps={{
                    value: value,
                    onChange: (e) => onChange(e)
                  }}
                  id="validation-basic-select"
                  error={Boolean(errors.select)}
                  aria-describedby="validation-basic-select"
                  {...(errors.select && { helperText: 'This field is required' })}
                >
                  <MenuItem value="days">Basic</MenuItem>
                  <MenuItem value="months">Medium</MenuItem>
                  <MenuItem value="year">Advanced</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="plan_description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  rows={4}
                  fullWidth
                  multiline
                  {...field}
                  label="Plan Description"
                  error={Boolean(errors.textarea)}
                  aria-describedby="validation-basic-textarea"
                  {...(errors.textarea && { helperText: 'This field is required' })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="plan_duration"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  type="number"
                  value={value}
                  label="Duration"
                  onChange={onChange}
                  placeholder="120"
                  error={Boolean(errors.firstName)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.firstName && { helperText: 'This field is required' })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="Duration Type"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="days"
                  label="Duration Type"
                  SelectProps={{
                    value: value,
                    onChange: (e) => onChange(e)
                  }}
                  id="validation-basic-select"
                  error={Boolean(errors.select)}
                  aria-describedby="validation-basic-select"
                  {...(errors.select && { helperText: 'This field is required' })}
                >
                  <MenuItem value="days">Days</MenuItem>
                  <MenuItem value="months">Months</MenuItem>
                  <MenuItem value="year">Year</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="students"
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <CustomTextField
                  fullWidth
                  type="number"
                  value={value}
                  label="Number of Students"
                  onChange={(e) => {
                    setValue('students', e.target.value);
                    if (e.target.value !== '') {
                      setStudentInputBoxChecked(true);
                    } else {
                      setStudentInputBoxChecked(false);
                    }
                  }}
                  placeholder="79"
                  error={Boolean(errors.users)}
                  aria-describedby="validation-basic-first-name"
                  disabled={studentInputChecked}
                  {...(errors.students && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="students_checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited users"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={
                      <Checkbox
                        {...field}
                        name="validation-basic-checkbox"
                        sx={errors.checkbox ? { color: 'error.main' } : null}
                        onChange={() => setStudentInputChecked((state) => !state)}
                        disabled={studentInputBoxChecked}
                      />
                    }
                  />
                )}
              />
              {errors.checkbox && (
                <FormHelperText
                  id="validation-basic-checkbox"
                  sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="admins"
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Admins"
                  onChange={(e) => {
                    setValue('admins', e.target.value);
                    if (e.target.value !== '') {
                      setAdminInputBoxChecked(true);
                    } else {
                      setAdminInputBoxChecked(false);
                    }
                  }}
                  placeholder="10"
                  error={Boolean(errors.admins)}
                  aria-describedby="validation-basic-first-name"
                  disabled={adminInputChecked}
                  {...(errors.admins && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="admins_checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited admins"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    disabled={adminInputBoxChecked}
                    control={
                      <Checkbox
                        {...field}
                        onChange={() => setAdminInputChecked((state) => !state)}
                        name="validation-basic-checkbox"
                        sx={errors.checkbox ? { color: 'error.main' } : null}
                      />
                    }
                  />
                )}
              />
              {errors.checkbox && (
                <FormHelperText
                  id="validation-basic-checkbox"
                  sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="teachers"
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Teachers"
                  onChange={(e) => {
                    setValue('teachers', e.target.value);
                    if (e.target.value !== '') {
                      setTeachersInputBoxChecked(true);
                    } else {
                      setTeachersInputBoxChecked(false);
                    }
                  }}
                  disabled={teachersInputChecked}
                  placeholder="10"
                  error={Boolean(errors.teachers)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.teachers && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="teachers_checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited teachers"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={
                      <Checkbox
                        {...field}
                        name="validation-basic-checkbox"
                        onChange={() => setTeachersInputChecked((state) => !state)}
                        disabled={teachersInputBoxChecked}
                        sx={errors.checkbox ? { color: 'error.main' } : null}
                      />
                    }
                  />
                )}
              />
              {errors.checkbox && (
                <FormHelperText
                  id="validation-basic-checkbox"
                  sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="batches"
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Batches"
                  onChange={(e) => {
                    setValue('batches', e.target.value);
                    if (e.target.value !== '') {
                      setBatchesInputBoxChecked(true);
                    } else {
                      setBatchesInputBoxChecked(false);
                    }
                  }}
                  disabled={batchesInputChecked}
                  placeholder="10"
                  error={Boolean(errors.batches)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.batches && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="batches_checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited batches"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={
                      <Checkbox
                        {...field}
                        name="validation-basic-checkbox"
                        sx={errors.checkbox ? { color: 'error.main' } : null}
                        onChange={() => setBatchesInputChecked((state) => !state)}
                        disabled={batchesInputBoxChecked}
                      />
                    }
                  />
                )}
              />
              {errors.checkbox && (
                <FormHelperText
                  id="validation-basic-checkbox"
                  sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="courses"
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Courses"
                  onChange={(e) => {
                    setValue('courses', e.target.value);
                    if (e.target.value !== '') {
                      setCoursesInputBoxChecked(true);
                    } else {
                      setCoursesInputBoxChecked(false);
                    }
                  }}
                  disabled={coursesInputChecked}
                  placeholder="10"
                  error={Boolean(errors.courses)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.courses && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="courses_checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited courses"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={
                      <Checkbox
                        {...field}
                        name="validation-basic-checkbox"
                        sx={errors.checkbox ? { color: 'error.main' } : null}
                        onChange={() => setCoursesInputChecked((state) => !state)}
                        disabled={coursesInputBoxChecked}
                      />
                    }
                  />
                )}
              />
              {errors.checkbox && (
                <FormHelperText
                  id="validation-basic-checkbox"
                  sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="classes"
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Classes"
                  onChange={(e) => {
                    setValue('classes', e.target.value);
                    if (e.target.value !== '') {
                      setClassesInputBoxChecked(true);
                    } else {
                      setClassesInputBoxChecked(false);
                    }
                  }}
                  disabled={classesInputChecked}
                  placeholder="10"
                  error={Boolean(errors.classes)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.classes && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="courses_checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited classes"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={
                      <Checkbox
                        {...field}
                        name="validation-basic-checkbox"
                        sx={errors.checkbox ? { color: 'error.main' } : null}
                        onChange={() => setClassesInputChecked((state) => !state)}
                        disabled={classesInputBoxChecked}
                      />
                    }
                  />
                )}
              />
              {errors.checkbox && (
                <FormHelperText
                  id="validation-basic-checkbox"
                  sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SubscriptionFeatures;
