import { motion } from "framer-motion"
import Lottie from "lottie-react"
import Robot from "@/assets/contact/Robot.json"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  User,
  AtSign,
  FileText,
  MessageSquare,
  Send,
  Loader2,
  Circle,
  CheckCircle,
  XCircle,
} from "lucide-react"

import { Formik, Form, Field } from "formik"
import { ContactFormSchema } from "@/utils/schema"
import { useState } from "react"
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { Card, CardContent } from "../about/card"

interface ContactFormValues {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  service: string;
  message: string;
}

const ContactFormSection: React.FC = () => {
  const [successOpen, setSuccessOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)

  const initialValues: ContactFormValues = {
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    service: "",
    message: "",
  }

  const onSubmit = async (values: ContactFormValues, actions: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // ✅ Auto-format the phone number into +XX-XXX-XXXXXXX
      let formattedPhone = values.phone
      if (values.phone) {
        try {
          const parsed = parsePhoneNumber(values.phone)
          if (parsed) {
            formattedPhone = parsed.formatInternational().replace(/\s/g, "-")
          }
        } catch (err) {
          console.warn("Phone format error:", err)
        }
      }

      console.log("Form Data:", { ...values, phone: formattedPhone })
      setSuccessOpen(true)
      actions.resetForm()
    } catch (error) {
      console.error(error)
      setErrorOpen(true)
    } finally {
      actions.setSubmitting(false)
    }
  }

  // ✅ CheckStatus Icons
  const CheckStatus = ({ isValid, hasError }: { isValid: boolean; hasError: boolean }) => {
    if (isValid) return <CheckCircle className="w-4 h-4 text-green-500" />
    if (hasError) return <XCircle className="w-4 h-4 text-red-500" />
    return <Circle className="w-4 h-4 text-gray-300" />
  }

  return (
    <section className="w-full isolate_container overflow-hidden scrollbar-hide">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Lottie
            animationData={Robot}
            loop={true}
            className="w-72 h-72 md:w-96 md:h-96"
          />
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg border border-gray-200 rounded-2xl">
            <CardContent>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-semibold text-gray-800 mb-8 text-center"
              >
                Contact Us
              </motion.h2>

              <Formik
                initialValues={initialValues}
                validationSchema={ContactFormSchema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <Form className="space-y-6 scrollbar-hide">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 scrollbar-hide">
                      {/* Full Name */}
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Field name="fullName">
                          {({ field }: any) => (
                            <Input
                              {...field}
                              placeholder="Full Name"
                              className={`pl-10 py-6 border rounded-md transition-colors ${formik.errors.fullName && formik.touched.fullName
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                }`}
                            />
                          )}
                        </Field>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckStatus 
                            isValid={!!formik.values.fullName && !formik.errors.fullName} 
                            hasError={!!(formik.errors.fullName && formik.touched.fullName)} 
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Field name="email">
                          {({ field }: any) => (
                            <Input
                              {...field}
                              type="email"
                              placeholder="Email Address"
                              className={`pl-10 pr-10 py-6 border rounded-md transition-colors ${formik.errors.email && formik.touched.email
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                }`}
                            />
                          )}
                        </Field>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckStatus 
                            isValid={!!formik.values.email && !formik.errors.email} 
                            hasError={!!(formik.errors.email && formik.touched.email)} 
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <PhoneInput
                          international
                          defaultCountry="PK"
                          placeholder="+92-300-1234567"
                          value={formik.values.phone}
                          onChange={(val) => {
                            if (!val) {
                              formik.setFieldValue("phone", val)
                              return
                            }
                            // ✅ Keep only digits
                            const digits = val.replace(/\D/g, "")

                            // ✅ Restrict to max 16 digits
                            if (digits.length <= 16) {
                              formik.setFieldValue("phone", val)
                            }
                          }}
                          className={`pl-4 pr-10 py-3 w-full rounded-md border transition-colors ${formik.errors.phone && formik.touched.phone
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            }`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckStatus 
                            isValid={!!formik.values.phone && !formik.errors.phone} 
                            hasError={!!(formik.errors.phone && formik.touched.phone)} 
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Field name="subject">
                          {({ field }: any) => (
                            <Input
                              {...field}
                              placeholder="Subject"
                              className={`pl-10 pr-10 py-6 border rounded-md transition-colors ${formik.errors.subject && formik.touched.subject
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                }`}
                            />
                          )}
                        </Field>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckStatus 
                            isValid={!!formik.values.subject && !formik.errors.subject} 
                            hasError={!!(formik.errors.subject && formik.touched.subject)} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service Select */}
                    <div className="relative">
                      <Select 
                        onValueChange={(value:any) => formik.setFieldValue("service", value)} 
                        value={formik.values.service}
                      >
                        <SelectTrigger
                          className={`w-full pl-4 pr-10 py-6 border rounded-md transition-colors ${formik.errors.service && formik.touched.service
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            }`}
                        >
                          <SelectValue placeholder="What are you looking for?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="living-room">Living Room Furniture</SelectItem>
                          <SelectItem value="bedroom">Bedroom Furniture</SelectItem>
                          <SelectItem value="dining">Dining Room Furniture</SelectItem>
                          <SelectItem value="office">Office Furniture</SelectItem>
                          <SelectItem value="outdoor">Outdoor Furniture</SelectItem>
                          <SelectItem value="custom">Custom Orders</SelectItem>
                          <SelectItem value="consultation">Design Consultation</SelectItem>
                          <SelectItem value="delivery">Delivery & Assembly</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CheckStatus 
                          isValid={!!formik.values.service && !formik.errors.service} 
                          hasError={!!(formik.errors.service && formik.touched.service)} 
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                      <Field name="message">
                        {({ field }: any) => (
                          <Textarea
                            {...field}
                            rows={5}
                            placeholder="Your Message"
                            className={`pl-10 pr-10 py-3 border rounded-md transition-colors ${formik.errors.message && formik.touched.message
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                              }`}
                          />
                        )}
                      </Field>
                      <div className="absolute right-3 top-4">
                        <CheckStatus 
                          isValid={!!formik.values.message && !formik.errors.message} 
                          hasError={!!(formik.errors.message && formik.touched.message)} 
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className="w-full bg-indigo-500 text-white py-3 rounded-md font-medium flex items-center justify-center gap-2"
                    >
                      {formik.isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </motion.div>

         
      </div>
    </section>
  )
}

export default ContactFormSection
