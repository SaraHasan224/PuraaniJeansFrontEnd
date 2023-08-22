import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';


import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ItemInfo from './item-info';
import PhotoDescription from './photo-description';
import ShipmentLocation from './shipment-location';
import VariantsInfo from './variants';
import { useRouter } from 'next/router';
import { HELPER } from '../../../../../../utils';
import { META_ACTIONS, PRODUCT_ACTIONS } from '../../../../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductStepper() {
    const router = useRouter();
    const dispatch = useDispatch()

    const photoDescriptionRef = useRef();
    const itemInfoRef = useRef();
    const shipmentLocationRef = useRef();
    const priceRef = useRef();

    const { color, addedProduct } = useSelector((state) => state.products);

    const [activeStep, setActiveStep] = React.useState(1);
    const [completed, setCompleted] = React.useState({});
    const [validationErr, setValidationErr] = React.useState("");

    useEffect(() => {
        if (HELPER.isEmpty(color)) {
        dispatch(PRODUCT_ACTIONS.ADD_NEW_PRODUCT_META());
        }
        if(HELPER.isNotEmpty(addedProduct?.step)) {
            handleStep(addedProduct?.step)
            setActiveStep(addedProduct?.step)
        }
    }, []);

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps();
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        setValidationErr("")
        let currentRef = photoDescriptionRef.current;
        if(activeStep === 2) {
            currentRef = itemInfoRef.current;
        }else if(activeStep === 3) {
            currentRef = shipmentLocationRef.current;
        }else if(activeStep === 4) {
            currentRef = priceRef.current;
        }
        const validation = currentRef.handleValidationAction()
        if(!validation?.error) {
            if(activeStep !== totalSteps()) {
                currentRef.handleNextAction();
                const newActiveStep =
                isLastStep() && !allStepsCompleted()
                    ? // It's the last step, but not all steps have been completed,
                    // find the first step that has been completed
                    steps.findIndex((step, i) => !(i in completed))
                    : activeStep;
                setActiveStep(newActiveStep+1);
            }else {
                currentRef.handleNextAction();
                currentRef.handleWizardCompleteAction();
            }
        }else {
            setValidationErr(validation?.description)
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(1);
        setCompleted({});
    };
    
    const handleCheckoutStep = () => {
        if(activeStep === 1) {
            return <PhotoDescription ref={photoDescriptionRef} activeStep={activeStep+1} totalSteps={totalSteps()} />;
        }else if(activeStep === 2) {
            return <ItemInfo ref={itemInfoRef} activeStep={activeStep+1} totalSteps={totalSteps()} />;
        }else if(activeStep === 3) {
            return <ShipmentLocation ref={shipmentLocationRef} activeStep={activeStep+1} totalSteps={totalSteps()} />;
        }else if(activeStep === 4) {
            return <VariantsInfo ref={priceRef} activeStep={activeStep+1} totalSteps={totalSteps()} />;
        }
    };

    return (
        <Stack sx={{ width: '100%', marginTop: '2rem', marginBottom: '2rem' }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep-1} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {HELPER.isNotEmpty(validationErr) ? <Typography sx={{ mt: 2, mb: 1 }}>
                    <div className="row">
                        <div className={`col-12 alert_classes `}>
                            <div className={`alertCustom error`} role="alert">
                                <div className={`alertAction error`}>
                                </div>
                                <div className="alertMsg">{validationErr}</div>
                            </div>
                        </div>
                    </div>
                </Typography> : ""}
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                            {handleCheckoutStep()}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 1}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {
                                isLastStep() ? <Button onClick={handleComplete}>Finish</Button> : <Button onClick={handleNext} sx={{ mr: 1 }}>
                                    Next (Step {activeStep}/{totalSteps()})
                                </Button>
                            }
                        </Box>
                    </React.Fragment>
                )}
            </div>
        </Stack>

    );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <AddAPhotoOutlinedIcon />,
        2: <LocalGroceryStoreOutlinedIcon />,
        3: <LocalMallOutlinedIcon />,
        4: <VideoLabelIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['Photo & Description', 'Item Information', 'Shipment & location', 'Variants'];
